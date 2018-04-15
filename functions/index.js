/**
 * Copyright 2018 Ding! App
 * based on
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Triggers whenever there is any change to the "orders" node and its sub-nodes.
exports.orderChange = functions.database.ref('/orders/{orderId}').onWrite((event) => {
	// Gets the stallId & orderId from this event (the changed order).
	let stallId;
	let orderId;

	// Increments or decrements according to whether the order is inserted or deleted.
	let change;
	if (event.after.exists() && !event.before.exists()) {
		change = 1;
		stallId = event.after.child('stallId').val();
		orderId = event.after.key;
	} else if (!event.after.exists() && event.before.exists()) {
		change = -1;
		stallId = event.before.child('stallId').val();
		orderId = event.before.key;
	} else {
		// Only changes counter when there is a new order inserted or an old order deleted.
		return null;
	}

	// Thus gets the reference to the stall's "number of people waiting" counter.
	let stallCounter = admin.database().ref('stall_overviews/' + stallId + '/queueCount');
	
	// Uses a promise so that our function waits for this async event to complete before it exits.
	return stallCounter.transaction((current) => {
		return (current || 0) + change;
	}).then(() => {
		return console.log('Counter for stall with id ' + stallId + ' updated by ' + change 
			+ ' due to order ' + orderId + '.');
	});
});

// Triggers when there is any change to the "review" node under the corresponding "order history" node.
exports.averageRating = functions.database.ref('/orders/{orderId}/review').onWrite((event) => {
	// Gets the stallId from this event (the changed review) in the corresponding changed order history.
	let stallId;

	// Changes the amount of rating sum according to whether the review is inserted, edited or deleted.
	let change;
	if (event.after.exists() && !event.before.exists()) {
		// Increases if there is a new review inserted.
		change = event.after.child('rating').val();
	} else if (!event.after.exists() && event.before.exists()) {
		// Decreases if there is an old review deleted.
		change = -event.before.child('rating').val();
	} else {
		// Extracts the difference if there is an old review edited.
		change = event.after.child('rating').val() - event.before.child('rating').val();
	}

	return null;
});

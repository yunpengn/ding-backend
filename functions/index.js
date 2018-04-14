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
exports.orderChange = functions.database.ref('/orders').onWrite((change) => {
	// Gets the stallId from this changed order.
	let stallId = change.after.child('stallId').val();
	// Thus gets the reference to the stall's "number of people waiting" counter.
	let stallCounter = functions.database.ref('/stall_overviews/' + stallId + "/queueCount");

	// Increments or decrements according to whether the order is inserted or deleted.
	let increment;
	if (change.after.exists() && !change.before.exists()) {
		increment = 1;
	} else if (!change.after.exists() && change.before.exists()) {
		increment = -1;
	} else {
		// Only changes counter when there is a new order inserted or an old order deleted.
		return null;
	}
	
	// Uses a promise so that our function waits for this async event to complete before it exits.
	return stallCounter.transaction((current) => {
		return (current || 0) + increment;
	}).then(() => {
		return console.log('Counter for stall with id ' + stallId + ' updated.');
	});
});

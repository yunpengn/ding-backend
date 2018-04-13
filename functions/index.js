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
	// Increments or decrements according to whether the order is inserted or deleted.
	let increment;
	if (change.after.exists() && !change.before.exists()) {
		increment = 1;
	} else if (!change.after.exists() && change.before.exists()) {
		increment = -1;
	} else {
		return null;
	}

	return null;
});

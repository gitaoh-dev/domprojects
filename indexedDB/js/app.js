if (import.meta.hot)
	(function () {
		// Check if the IndexDB is supported
		if (!window.indexedDB) {
			console.log(`You Browser doesn't support IndexedDB`);
			return;
		}

		// Open a Database Connection
		const request = indexedDB.open('CRM', 1); // Name, Version - Db

		request.onerror = (e) => {
			console.error(e.target.errorCode);
		};

		request.onsuccess = (e) => {
			const db = e.target.result;
			// ID
			getContactById(db, 1);

			// EMAIL
			getContactByEmail(db, 'john.doe@outlook.com');
			getContactByEmail(db, 'john.doe@gmail.com');

			// ALL CONTACTS
			getAllContacts(db);

			// DELETE CONTACT
			deleteContact(db, 1);
			getContactById(db, 1);


			// INSERT NEW DATA
			// insertContact(db, {
			// 	email: 'john.doe@outlook.com',
			// 	first: 'John',
			// 	last: 'Doe',
			// });

			// insertContact(db, {
			// 	email: 'jane.doe@hotmail.com',
			// 	first: 'Jane',
			// 	last: 'Doe',
			// });
		};

		// Create object stores
		request.onupgradeneeded = (e) => {
			let db = e.target.result;

			// create the contacts object store
			// with auto-increment id
			let store = db.createObjectStore('Contacts', {
				autoIncrement: true,
			});

			// create an index on the email property
			let index = store.createIndex('email', 'email', {
				unique: true,
			});
		};

		function insertContact(db, contact) {
			// create a new Transaction
			const txn = db.transaction('Contacts', 'readwrite');

			// get the Contacts object store
			const store = txn.objectStore('Contacts');

			// Create new Record
			let query = store.put(contact);

			// Handle success cas
			query.onsuccess = function (e) {
				console.log(e);
			};

			// Handle the error case
			query.onerror = function (e) {
				console.log(e.target.errorCode);
			};

			// Close the database once the transaction completes
			txn.oncomplete = function () {
				db.close();
			};
		}

		// Read data from the object store by KEY
		function getContactById(db, id) {
			const txn = db.transaction('Contacts', 'readonly');
			const store = txn.objectStore('Contacts');
			let query = store.get(id);
			query.onsuccess = function (e) {
				if (!e.target.result)
					console.log(`The Contact with #${id} not found`);
				else console.table(e.target.result);
			};
			query.onerror = function (e) {
				console.error(e.target.errorCode);
			};
			txn.oncomplete = function () {
				db.close();
			};
		}

		function getContactByEmail(db, email) {
			const txn = db.transaction('Contacts', 'readonly');
			const store = txn.objectStore('Contacts');
			// get the index from the Object Store
			const index = store.index('email');

			// query by indexes
			let query = index.get(email);

			// return the result object on success
			query.onsuccess = function (e) {
				console.log('Data:', e.target.result);
			};
			query.onerror = function (e) {
				console.error('Error:', e.target.errorCode);
			};

			// Close the database transaction
			txn.oncomplete = function () {
				db.close();
			};
		}

		// Read All data from an object store
		function getAllContacts(db) {
			const txn = db.transaction('Contacts', 'readonly');
			const objectStore = txn.objectStore('Contacts');
			const c = objectStore.openCursor();
			c.onsuccess = (event) => {
				let cursor = event.target.result;
				if (cursor) {
					let contact = cursor.value;
					console.log(contact);
					// continue next record
					cursor.continue();
				}
			};

			// txn the database connection
			txn.oncomplete = function () {
				db.close();
			};
		}

		function deleteContact(db, id) {
			// Create a new transaction
			const txn = db.transaction('Contacts', 'readwrite');
			
			// Get the Contacts object store
			const store = txn.objectStore('Contacts');
			let query = store.delete(id);

			// Handle the success case
			query.onsuccess = function (e) {
				console.log(e);
			};

			// Handle the error case
			query.onerror = function (e) {
				console.log(e.target.errorCode);
			};

			// close the database once the transaction completes
			txn.oncomplete = function () {
				db.close();
			};
		}
	})();

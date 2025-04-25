import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } from '$env/static/private';

let connection = null; // This variable will hold the MySQL connection instance

export function createConnection() {
	if (!connection) {
		connection = mysql.createConnection({
			host: DB_HOST, // Hostname of the MySQL server
			user: DB_USER, // Username for database authentication
			port: DB_PORT, // Port on which the MySQL server is running
			password: DB_PASSWORD, // Password for the given database 
			database: DB_NAME // Name of the database to connect to
		});
	}
	return connection;
}

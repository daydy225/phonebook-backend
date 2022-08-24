# Part 3 Phonebook exercises

## step 1

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

## step 2

Implement a page at the address http://localhost:3001/info information of how many entries was in the phonebook and the time when the request was recieved.

## step 3

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

## step 4

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

## step 5

Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons. Generate a new id for phonebook entry with a random range of numebers between 1 and 100000000.

## step 6

Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook

## step 7

Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration

## step 8

Configuration of morgan so that it also shows the data sent in HTTP POST requests

## step 9

Configuration of frontend to get all persons number from the phonebook backend.

## step 10

Deploy the backend to the internet. the link is https://phonebook-backend-225.herokuapp.com/

## step 11

Generate a production build of your frontend, and add it to the internet application

## step 12:Command-line database

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.
Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

## step 13: phonebook database step 1

Change the fetching of all phonebook entries so that the data is fetched from the database.

## step 14: phonebook database step 2

Change the backend so that new numbers are saved to the database.

## step 15: phonebook database, step3

Change the backend so that deleting phonebook entries is reflected in the database.

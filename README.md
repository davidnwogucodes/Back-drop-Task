# Back-Drop Assessment

This is a simple application that collects user bank data and verifies them over a third party API.
If the third party ApI verifies our user, it saves their credentials to the database and updates their verification status to true. Else 
it is saved but the verification status remains false.

# Tools/Technologies Used
- JavaScript/Nodejs
- Apollo GraphQl
- MongODb
- Paystack API

# How to use
You might need a graphql playground to make your query requests.

To start the server, type "npm start" at the console
Go to http://localhost:6060/graphql

Make a request to paystack via the playground by inputing your account name and bank code

![Screenshot](graph2.jpg)

Get a single user

![Screenshot](graph3.jpg)

# What's a good reason why  the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario?

In this particular case, the Damerau-Levenshtein Distance method may not be as efficient as the more general Levenshtein Distance algorithm since it also takes into account transpositions, which may not be prevalent in the Nigerian context. The additional transposition process makes the Damerau-Levenshtein Distance algorithm more computationally demanding. In this situation, a decent balance between accuracy and efficiency is achieved by employing the pure Levenshtein Distance algorithm with a tolerance of up to two errors.

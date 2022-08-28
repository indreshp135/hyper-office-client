# HyperOffice Client

Created for Smart India Hackathon 2022 - Digital infrastructure and a robust and smart Document Management System (DMS) (PS: RK795) of Indian Council for Cultural Relations (ICCR)

## Repository Details

Server Source Code: [Github](https://github.com/CaptainIRS/hyper-office-server/)

## Problem Statement

For the next Smart India Hackathon initiative of Education Ministry in Government of India, the Indian Council for Cultural Relations is likely to pose a challenge “How to make ICCR a paperless organization within one year?” to the potential hackathoners. The idea behind this challenge is to find the mother of all solutions to the multiple problems being faced by a government organization such as ICCR by adopting a Paperless Strategy under which ICCR will no longer issue or ask for paper documents across all of its internal and external operations. If achieved, this will not only make ICCR a fully paperless organization (the first one in GOI to embark on a path where 100 % of its internal processes and external interactions will be done digitally), but this will also eliminate the need of using a significant quantity of paper in its work every year. The solution that ICCR is looking for is much more than the e-Office solution being provided by NIC, whose vision is to achieve a simplified, responsive, effective and transparent working of all Government Offices, but not to target a 100% paperless government or organization. The 6 features of the e-Office of NIC viz. SPARROW, eFile, KMS, PIMS, eTour and eLeave do not even try to help a government organization to go 100% paper-free.ICCR intends to embark on a journey to find the necessary technology and implement it within its organization to enable paper-free transactions. In case the hackathoners, during the next Smart India Hackathon 2022, are able to find an intelligent, lasting solution to this challenge in terms of suggesting a digital infrastructure and a robust and smart Document Management System (DMS) required for making ICCR a first Government of India organization to go paper-free by 31st December 2022, it would enable ICCR in becoming a smarter, faster, more transparent and thus, more accountable and more result-oriented as opposed to process-oriented organization. This “Mother of All Solutions” to most bureaucratic problems will thus set ICCR apart from other GOI organizations by helping it become a complete, round and mobile organization, in addition to, making it the first total paper-free, environment-friendly organization. ICCR does aspire to become an organization that wants to include India’s scientific temper, indigenous technology, innovation and Indian enterprise as essential parts of our Indian culture in its arsenal of soft power projection capabilities abroad. Moreover, the pandemic is making us realize how important the digital space has become and how much the requirement of physicality in Business Operations has shrunk. As a brief background, ICCR was set up in 1950 by the Government of India to promote cultural relations between India and other countries. ICCR has the sanctioned strength of 207 officials and staff, has 38 Indian Cultural Centres abroad and 18 Regional Offices in India. ICCR organizes various cultural activities in India as well as abroad.

## Solution

### Salient features:

1. Reusable document workflows with a customisable hierarchy of approvals
2. Form builder to create any type of form to collect various kinds of data
3. Every transaction (flow of information, including document workflows and approvals within the system) is transparent and cryptographically verifiable
4. Powerful query system to filter and extract data about the form responses
5. Fully decentralized system to reduce costs and improve availability
6. The application can be viewed in multiple languages and can be installed in Android phones to serve a diverse base of users

### Technical information:

1. The frontend is made using React and the Mantine UI library
2. The API backend is written in express JS
3. Cassandra database is used to store the user data in a distributed way
4. Hyperledger blockchain is used to obtain the certificates for signing PDFs and to record the transaction history pertaining to every response
5. IPFS distributed storage is used to save the certificates in a fault tolerant way
6. Certificates are signed using the pyHanko library
7. Elasticsearch is used to query the form responses
8. The full system is hosted in the cloud using docker containers and Apache virtual hosts
9. Concepts of PWA and TWA are used to make the application available on mobile platforms

## Screenshots

| ![image](https://i.imgur.com/oaWYoKT.png) | ![image](https://i.imgur.com/OJExDLD.png) |
| :---------------------------------------: | :---------------------------------------: |
|         Create/edit forms (admin)         |          Create workflow (admin)          |
| ![image](https://i.imgur.com/X12Os3t.png) | ![image](https://i.imgur.com/UmDe2hN.png) |
|            Form filling (user)            |             Show forms (user)             |
| ![image](https://i.imgur.com/i1gqu4z.png) | ![image](https://i.imgur.com/6J6912h.png) |
|         View form response (user)         |       Approvals pending (moderator)       |
| ![image](https://i.imgur.com/3rTL5gT.png) | ![image](https://i.imgur.com/shvGOld.png) |
| Approval screen (moderator/administrator) |                 Run Query                 |
| ![image](https://i.imgur.com/o0lmMi6.png) | ![image](https://i.imgur.com/NNwLhaD.png) |
|                Signed PDF                 |         Digital signature in pdf          |
| ![image](https://i.imgur.com/ZoqcA6v.png) | ![image](https://i.imgur.com/Ml8J8l8.png) |
|    Transaction on blockchain explorer     |               File on IPFS                |


# Testing Document
## For Fantasy Football App 
Version 1.0

Prepared by Tien Hoang, Anthony Micco, Nicolas Ott, Austin Winger-Kailer, and Nicholas Winsen

# Table of Contents 


- 1 [Introduction](#1-introduction)
  - 1.1 [Document Purpose](#11-document-purpose)
- 2 [Front End Testing](#2-front-end-testing)
    - 2.1 [Expo Go](#21-expo-go)
- 3 [Back End Testing](#3-back-end-testing)
    - 3.1 [Swagger](#31-swagger)
    - 3.2 [Unit Tests](#32-unit-tests)



## 1. Introduction
### 1.1 Document Purpose
The purpose of this document is to review our testing methods and the results that they produced. This will include methods used to test front-end functions as well as testing for the back-end.


## 2. Front End Testing
### 2.1 Expo Go
Our main method for testing our front end application was to use an emulator and an application called Expo Go. For those who don't know, Expo Go is a toolchain based on React Native that provides many tools for the provess of developing and testing Native React applications and provides the user with the user interface and service components typically found in third-party Native React Native components. 

When running the front end, it will produce a scannable QR code in the terminal that you may use to see how the app would look on your phone. However, for our purposes, we were able to use an emulator on our laptops for both Android and Apple devices (although only those with a MacBook can access this) to avoid using our own device. This allowed for quick testing and reloading of our application.

The result of using this testing method is that we were able to accomplish a large portion of what we set out to do for the front end.

## 3. Back End Testing
### 3.1 Swagger
One method we used to test our back end functionality is a node module called Swagger. This is a module generated API documentation that allowed us to test or API calls directly from the browser. By using this simple module, we were able to test whether our API calls were able to interact with our database, and whether our logic was correct. 

By using Swagger, we were able to easily test our API in order to connect this with the front end as soon as possible for more testing.

### 3.2 Unit Tests
Another method that we used was unit testing. With unit testing, we were able to test each of our components independently of each other despite their dependencies. This was done using Jest, which is a framework designed to ensure correctness of any JavaScript codebase.

We were able to test our components separately because Jest allows us to create mock or fake functions of the dependencies of each file. For example, if File1 requires File2 to function, we would create mock functions of File2 in order to test File1 without having to implement everything of File2 and File2's dependencies.

Since we could test these independently, it was very quick and easy to tell where our errors were.

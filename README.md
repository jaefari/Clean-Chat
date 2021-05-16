# Clean Chat
Clean chat is just a hobby to commemorate and refresh memories by implementing [Uncle Bob's clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) using javascript



There are lots of reasons why I'm remarkably into Clean Architecture. It allows you to only concern about your business logic. To be honest, it makes sense not to worry or integrate your business logic with tools. The most crucial factor for me is that I can intensely test vital business rules without heavy usage of stubs or spies! And? and use tools as a tool only! A database is just a tool! Your web server is just a tool! So, if you feel awkward when you start your project by writing a server in Express, Hapi, Nestjs, then try clean architecture.

-- Dude! You're doing a big upfront design!

No, we're not! We're just decoupling things using dependency injection. That's it. sure, when business changes or you get more familiar with it, the use-cases layer or even entity layer might change, but because they're enormously lean, changes won't be a headache.

If you're interested, read more about it on Robert C. Martin's blog. He is not only a fascinating software engineer but also a great writer.

https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html

![clean architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)


## Be cautious
First, it's just an afternoon playGround :)

***Second***, the purpose of this repo is demonstrating the clean architecture using vanilla js as much as possible, Obviously in production when your project get bigger, it makes more and more sense to use IoC containers, such as [Inversify](https://www.npmjs.com/package/inversify) or [Awilix](https://www.npmjs.com/package/awilix) or [TypeDI](https://www.npmjs.com/package/typedi) or...


## Installation

simply use

```bash
npm i
```

## Usage
here you can see that webserver or websocket is just a communicatino tool, so I could simply use them as a tools. So instead of writing my business logic in the middle of express webserver, webserver or websocket is just a tool which only has access to business use-cases. I could simply add GRPC or GraphQl as a driver!

```bash
npm run start-webserver #for using webserver version as a driver
npm run start-websocket #for using websocket version as a driver
```

## test

```bash
npm test
```

## Postman collection
https://www.getpostman.com/collections/ef8e54ddac1516590c80

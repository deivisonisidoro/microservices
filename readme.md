# E-Commerce Template

Welcome to the E-Commerce Template project! This project serves as a foundation for building e-commerce applications using microservices architecture. The project is structured as a mono repository, allowing easy management and collaboration across multiple microservices.

## Overview

The E-Commerce Template project provides a set of microservices that together form the backbone of an e-commerce platform. These microservices are designed to be modular and scalable, enabling you to add new features and functionalities over time.

### Microservices

The following microservices are included in this repository:

1. [**API Gateway**]((api-gateway/README.md)): Handles incoming requests, manages authentication, and routes requests to the appropriate microservices
2. [**Customers API**](customers-service/README.md): Manages customer information and authentication.
3. [**Email API**](notification-service/README.md): Responsible for sending emails, such as order confirmations and promotional emails. 

## Getting Started with Docker Compose

To run the E-Commerce Template project using Docker Compose, follow these steps:

1. Clone the repository to your local machine:

   ```bash
    git clone https://github.com/Manu-Deiv/ecommerce-template.git
   ```
2. Navigate to the root directory of the repository:
    ```bash	
     cd ecommerce-template
    ```
3. Run the Docker Compose file to start the required services:
    ```bash
     docker-compose up -d
    ```
    Running Docker Compose is essential as it starts the required services such as databases (dev-db and test-db), Apache Zookeeper (zoo1), and Apache Kafka (kafka1). These services are crucial for the functionality of the microservices and communication between them.

After starting the services, you can proceed to set up and run individual microservices as per their respective README files.



## Contact

If you have any questions or feedback regarding the E-Commerce Template project, please don't hesitate to reach out:

- Email: your-email@example.com
- Issue Tracker: Link to issue tracker

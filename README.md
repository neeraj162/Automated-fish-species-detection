# Automated Fish Species Detection
This repository contains the code for an Automated Fish Species Identification project. The project is divided into three main folders: frontend, backend, and model_training. The project leverages ReactJS for the frontend, Python's FastAPI for the backend, and a pre-trained MobileNetV2 model for fish species classification.

## Overview
The Automated Fish Species Identification project aims to identify the species of fish in images. It provides a user-friendly interface for uploading fish images, and then utilizes a trained machine learning model to predict the fish species. The accuracy of the model on the testing set is an impressive 99%.

## Folder Structure
* frontend: Contains the ReactJS-based frontend code for the user interface.
* backend: Contains the Python FastAPI code for serving predictions from the trained model.
* model_training: Contains code and data for training the fish species classification model using MobileNetV2.

## Frontend
The frontend folder contains the user interface for this project. Users can drag and drop fish images onto the interface, and the system will predict the species of the fish using the trained machine learning model. The ReactJS framework is used to build this interactive interface.

## Backend
The backend folder contains the Python FastAPI application responsible for handling requests from the frontend, invoking the model for predictions, and sending back the results. This API is the bridge between the user interface and the machine learning model.

## Model Training
The model_training folder contains the code and dataset used to train the fish species classification model. We used a pre-trained MobileNetV2 architecture and fine-tuned it on a custom dataset. The model achieved an impressive accuracy of 99% on the testing set. You can find more details about the training process and dataset in this folder.

## Getting Started
To set up and run this project locally, follow these steps:

Clone this repository to your local machine:

```
git clone https://github.com/yourusername/automated-fish-species.git
cd automated-fish-species
```

After setting up the frontend, backend, and model, you can start the project and access it through your web browser.

Enjoy using the Automated Fish Species Identification project! If you have any questions or need assistance, please don't hesitate to reach out to us.

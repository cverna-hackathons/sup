### Example classifier

## Description
Classifies provided image per file path and returns a random float between 0 - 1.

## Expectations
Commited code is expected to be functional without having to train model per deployment.

## How to train
Training is not needed for this classifier.

## How to validate
Validation is impossible for this classifier.

## API
*classify (imageFilePath: string): Promise<number>* - Method to classify image that is accessible at the provided *imageFilePath*.
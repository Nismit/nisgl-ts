#
# Custom CircleCI Docker image for nisgl-ts
# Usage
# cd .circleci/
# docker build -t nismit/nisgl-ts-node .
# docker images (Make sure that the image is built)
# docker login
# docker push nismit/nisgl-ts-node:latest
#

FROM circleci/node:14.17

# Change user to root for setting up
USER root

# Update base packages
# And install xvfb, dev packages, then clean up
RUN apt-get update \
    && apt-get install -y xvfb libxi-dev libgl1-mesa-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Change user to circleci
USER circleci
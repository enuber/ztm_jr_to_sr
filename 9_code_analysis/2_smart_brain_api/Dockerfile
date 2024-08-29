FROM node:20.15.1

WORKDIR /usr/src/smart_brain_api

COPY ./ ./

RUN npm install


# this says go into the bash profile of our container.
# exit to leave 
# make sure to check for node -v to be sure it's the version you expect.
CMD ["/bin/bash"]
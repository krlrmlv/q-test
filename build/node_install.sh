#!/bin/bash

curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

. "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
. "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
. "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}

npm install -g yarn

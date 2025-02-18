#!/bin/bash

# Publish the library to the local Verdaccio repository
# 
npm run build-all
# npm login --registry http://localhost:4873
# cliff, 1**6
# npm unpublish --registry --force http://192.168.31.223:4873/

# npm unpublish  --registry http://localhost:4873/ ts-iron-tree@1.0.0 --force


npm publish --registry=http://localhost:4873

# npm set registry http://localhost:4873/
# npm config delete registry
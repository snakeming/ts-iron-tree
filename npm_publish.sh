
# unpublish so that the package number can be reused (for local testing, avoid incrementing the version number)
npm unpublish @smart-minds/ts-iron-tree --force --registry http://localhost:4873/

# publish to local registry
# pls note update version in package.json before publish
npm publish --registry http://localhost:4873/
  

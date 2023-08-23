yarn build

cd dist
mv _app app

# then replace _app with app in any html files
sed -i '' 's/_app/app/g' *.html
# replace all "/ with "
sed -i '' 's/"\//"/g' *.html

# # into app immtuable
# cd app/immutable

# cd chunks
# sed -i '' 's/"\//"/g' *.js
# cd ..
# cd entry
# sed -i '' 's/"\//"/g' *.js
# cd ..
# cd nodes
# sed -i '' 's/"\//"/g' *.js
# cd ..

# #out of app/immutable
# cd ..
# cd .. 

cd ..
yarn deploy

rm -fr dist
yarn build

cd dist
mv _app app

# then replace _app with app in any html files
sed -i '' 's/_app/app/g' *.html
# replace all "/ with "
sed -i '' 's/"\//"/g' *.html


cd ..
yarn deploy

rm -fr dist
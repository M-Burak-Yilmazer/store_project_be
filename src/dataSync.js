"use strict";

const axios = require("axios");

const Product = require("./models/productModel");
const Category = require("./models/categoryModel");
const User = require("./models/userModel");

let categoryData = [];
let productData = [];

const getCategoryAndProductData = async () => {
  // fetch the dummy category data
  const category = await axios("https://dummyjson.com/products/categories");
  categoryData = category.data;
  //   console.log(categoryData);

  // add to them to Category model
  await categoryData.map((category) => Category.create({ name: category }));

  //fetch the dummy product data
  const product = await axios("https://dummyjson.com/products?limit=100");
  productData = product.data.products;
  //   console.log(productData)

  // add product data to the product model

  //*Bu kodda, Promise.all() kullanarak her ürün için bir Product.create() işlemi gerçekleştirirken, Category.findOne() işleminin tamamlanmasını bekliyoruz. Eğer kategori bulunamazsa, bir hata mesajı yazdırıyoruz

  await Promise.all(
    productData.map(async (product) => {
      const category = await Category.findOne({ name: product.category });
      if (category) {
        await Product.create({
          ...product,
          categoryId: category._id,
        });
      } else {
        console.log(`Kategori bulunamadı: ${product.category}`);
      }
    })
  );

  await User.create({
    email: "admin@aa.com",
    password: "admin",
  });
  console.log("user ")
  // add the dummy data to model

  // const createCategory = async ()=>{
  //     categoryData.map(async(category)=>{
  //         await Category.create({name:category})
  //     })
  // }
};
async function cleanCollections() {
  await Category.deleteMany({}).then(() => console.log("category deleted")); // Kategorileri temizler
  await Product.deleteMany({}).then(() => console.log("Product deleted")); // Urunleri temizler
  await User.deleteMany({}).then(() => console.log("user deleted")); // Kullanıcıları temizler
}

module.exports = async () => {
  await cleanCollections();
  await getCategoryAndProductData();
  //   await createCategory()
};

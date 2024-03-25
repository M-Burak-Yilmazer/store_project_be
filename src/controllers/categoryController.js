const ProductCategory = require("../models/categoryModel");
require("express-async-errors");

const ProductCategoryController = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Category"]
            #swagger.summary = "List Category"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(ProductCategory);

    // const data = await ProductCategory.find();
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(ProductCategory),
      data: data,
    });
  },
  create: async (req, res) => {
    /*
        #swagger.tags = ["Category"]
        #swagger.summary = "Create Category"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                name: 'Test Category'
            }
        }
    */
    const data = await ProductCategory.create(req.body);
    res.status(201).send({
      error: false,
      data: data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Category"]
        #swagger.summary = "Get Single Category"
    */
    const data = await ProductCategory.findOne({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    /*
        #swagger.tags = ["Category"]
        #swagger.summary = "Update Category"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                name: 'Test Category'
            }
        }
    */
    const data = await ProductCategory.updateOne(
      { _id: req.params.categoryId },
      req.body,
      { runValidators: true }
    );
    const newData = await ProductCategory.findOne({
      _id: req.params.categoryId,
    });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
      newData,
    });
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Category"]
        #swagger.summary = "Delete Category"
    */
    const data = await ProductCategory.deleteOne({
      _id: req.params.categoryId,
    });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
  products: async (req, res) => {
    /*
        #swagger.tags = ["Category"]
        #swagger.summary = "Products of Category"
    */
    const data = await res.getModelList(
      Product,
      {
        categoryId: req.params.categoryId,
      },
      "categoryId"
    );
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(
        Product,
        { categoryId: req.params.categoryId },
        "categoryId"
      ),
      data,
    });
  },
};


module.exports =  ProductCategoryController 

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories - DONE
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    })

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }

});

// find one category by its `id` value - finished
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err)
  }
});

// create a new category - finished
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// update a category by its `id` value - finished
router.put('/:id', async (req, res) => {

  try {
    const categoryData = await Category.update(req.body, { 
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err)
  }

});

// delete a category by its `id` value - finished
router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(productData)

  } catch (err) {
    res.status(500).json(err)
  }


});

module.exports = router;

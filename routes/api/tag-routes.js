const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags - finished
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }]

    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// find a single tag by its `id` - finished
router.get('/:id', async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]

    });

    if (!tagData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }


    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// create a new tag - finished
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData)

  } catch (err) {
    res.status(500).json(tagData);
  }
});

// update a tag's name by its `id` value - 
router.put('/:id', async (req, res) => {

  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(tagData);
  }
});

// delete on tag by its `id` value - finished
router.delete('/:id', async (req, res) => {

  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(tagData)

  } catch (err) {
    res.status(500),json(err)
  }
});

module.exports = router;

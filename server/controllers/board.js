const Board = require('../models/board');
const fs = require('fs');
const request = require('request');
const path = require('path');
const apiKey = 'acc_48385034cbd6843';
const apiSecret = 'a62cc1c7c2a76bc89ddfe5b02e7e9d6c';
const imageUrl = 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg';

exports.board_create = (req, res, next) => {
  const board = new Board({
    name: req.body.name,
    isDraft: req.body.isDraft
  });

  board.save((err) => {
    if (err) return next(err);
    res.send(board);
  })
};

exports.board_get_all = (req, res, next) => {
  Board.find((err, boards) => {
    if (err) return next(err);
    res.send(boards);
  });
};

exports.board_get_by_id = (req, res, next) => {
  Board.findById(req.params.id, (err, board) => {
    if (err) return next(err);

    if (!board) return next();

    res.send(board);
  });
};

exports.board_add_image = (req, res, next) => {
  Board.findById(req.params.id, (err, board) => {
    if (err) return next(err);

    request.get(
      // 'https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(path.join('http://photo-board.eu-4.evennode.com/', req.file.path)),
      'https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(imageUrl),
      (error, response) => {
        if (error) return next(error);

        const result = JSON.parse(response.body).result;

        if (!result) return next(error);

        const image = {
          id: req.file.filename,
          url: req.file.path,
          isDraft: true,
          tags: result.tags,
        };

        const boardImages = board.images;
        boardImages.push(image);

        Board.updateOne(
          { _id: board._id },
          { $set: { images: boardImages, isDraft: true } },
          (errorUpdate, result) => {
            if (errorUpdate) return next(errorUpdate);
            res.send(image);
          }
        );
      })
    .auth(apiKey, apiSecret, true);
  });
};

exports.board_save_changes = (req, res, next) => {
  Board.findById(req.params.id, (err, board) => {
    if (err) return next(err);

    const boardImages = board.images;
    boardImages.forEach(img => {
      img.isDraft = false;
    });

    Board.findByIdAndUpdate(
      { _id: board._id },
      { $set: { images: boardImages, isDraft: false } },
      { new: true },
      (err, result) => {
        if (err) return next(err);
        res.send(result);
      }
    );
  });
};

exports.board_dismiss_chagnes = (req, res, next) => {
  Board.findById(req.params.id, (err, board) => {
    if (err) return next(err);

    const boardImages = board.images;

    const savedImages = boardImages.filter(img => {
      if (img.isDraft) {
        fs.unlink(img.url, (err, result) => {
          if (err) return next(err);
        });
        return false;
      }
      return true;
    });

    Board.findByIdAndUpdate(
      { _id: board._id },
      { $set: { images: savedImages, isDraft: false } },
      { new: true },
      (err, result) => {
        if (err) return next(err);
        res.send(result);
      }
    );
  });
};
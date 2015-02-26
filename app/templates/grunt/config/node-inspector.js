module.exports.tasks = {
  'node-inspector': {
    custom: {
      options: {
        'web-host': 'localhost'
      }
    }
  },

  concurrent: {
    debug: {
      tasks: ['node-inspector']
    }
  }
};

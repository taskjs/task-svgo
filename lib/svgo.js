var Execution = require('execution');
var Promise = require('es6-promise').Promise;
var Record = require('record');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        plugins: {
            type: 'array',
            default: [],
            label: 'Plugins config',
            placeholder: 'Disable plugins: [{removeEmptyAttrs: false }, {removeUselessStrokeAndFill: false}]'
        }
    },
    run: function (inputs, options, logger, settings) {
        return this._run(inputs, options, logger, settings);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var SVGO = require('svgo');
        var svgo = new SVGO(/*{ custom config object }*/);

        var promises = inputs.map(function(record){

            return new Promise(function(resolve, reject){

                var source = record.contents.toString();
                svgo.optimize(source, function(result) {
                    // {
                    //     // optimized SVG data string
                    //     data: '<svg width="10" height="20">test</svg>'
                    //     // additional info such as width/height
                    //     info: {
                    //         width: '10',
                    //         height: '20'
                    //     }
                    // }
                    resolve(new Record({
                        contents: result.data,
                        path: record.path
                    }));
                });
            });
        });

        return Promise.all(promises).then(resolve, reject);
    }
})

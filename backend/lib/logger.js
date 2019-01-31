const dateFormat = require('dateformat');
const chalk = require('chalk');
const logger = function () {
    //types
    //0 -> info
    //1 -> warning
    //2 -> error
    //set the types here, 0, 1, 2 means all logs
    const types = [1, 2, 3];
    const errTypeMap = {
        1: 'info',
        2: 'warn',
        3: 'error'
    }
    const colorize = {
        1: {b: 'bgBlack', f: 'blue'},
        2: {b: 'bgBlack', f: 'yellow'},
        3: {b: 'bgBlack', f: 'red'}
    }
    // msg the custom message you want to log
    // type is the type of the log
    // file is the name of the file where the log is from
    // requester is the ip where request came from
    // msgObject is the actual JSON object
    const log = function(type, action, msg, file, requester, msgObject) {
        let func = console.log,
        str,
        backColor,
        foreColor,
        dt = dateFormat();
        if (arguments.length === 1) {
            str = arguments[0] + '\n';
        }
        else {
            func = console[errTypeMap[type]];
            backColor = colorize[type]['b'];
            foreColor= colorize[type]['f'];
            if (types.indexOf(type) > -1) {
                str = chalk[foreColor][backColor].bold('[' + errTypeMap[type].toUpperCase() + '] ');
                str += chalk.white.bold('[' + dt + '] ');
                if (action) {
                    str += chalk.magenta.bold('[' + action.toUpperCase() + '] ');
                }
                if (msg) {
                    str += msg;
                }
                if (requester) {
                    str += ' From : ';
                    str +=  chalk.gray.underline(requester);
                }
                if (file) {
                    str += ' \n file : ';
                    str += file;
                }
                if (msgObject && Object.keys(msgObject).length > 0) {
                    str += '\n Actual Message :-  \n';
                    str += JSON.stringify(msgObject);
                }
            }
            str += '\n'
        }
        func(str);
    }
    return {log}
}

module.exports = logger();

exports.handler = async function (event, context) {
    // console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    console.log('handler', { event, context });
    return { event, context };
};

export default const fetchPromiseMiddleware = (store) => (next) => (action) => {
    const { promise, types, payload } = action;

    //若 action 內没有 promise 熟悉，代表不需 async 处理
    if (!promise) {
        return next(action);
    }

    // 对应API请求的
    const {FETCH, FETCH_FAIL, RECEIVE, SUCCESS, ERROR} = types;

    //广播 请求开始动作
    next({payload, type: start});

    return promise.then((resp) => {
        if (resp.status) {
            
        }
    }).catch((error) => {
        payload.error = error;
        next({payload, type: error})
    });
};

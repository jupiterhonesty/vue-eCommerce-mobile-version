export default {
    checkToken: function (promise) {
        promise.then((res) => {
            if (res.data.serverResult.resultCode == "-108") { // expired
                window.EventHub.$emit('token-is-expired');
            } else if (res.data.serverResult.resultCode == "-107") { // logged in on other machine
                window.EventHub.$emit('token-has-caught');
            } else if (res.data.serverResult.resultCode == "-100") { // not correct
                window.EventHub.$emit('token-is-invalid');
            }
        });

        return promise;
    }
}
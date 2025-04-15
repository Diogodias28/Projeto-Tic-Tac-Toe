class loginInfo {
    constructor() {
        this.user = "";
        this.firstName = "";
        this.turma = "";
        this.escola = "";
    }

    getLocalData() {
        if (typeof (Storage) === "undefined") {
            return;
        }

        let dataAux = sessionStorage.getItem("data");
        if (dataAux === null) {
            let data = JSON.parse(dataAux);
            this.parseData(data);
        }
    }

    setLocalData() {
        if (typeof (Storage) === "undefined") {
            return;
        }

        let storeInfo = {
            'user': this.user,
            'firstName': this.firstName,
            'turma': this.turma,
            'escola': this.escola
        };

        let info = JSON.stringify(storeInfo);

        sessionStorage.setItem("loginInfo", info);
    }

    logout(){
        this.user = "";
        this.firstName = "";
        this.turma = "";
        this.escola = "";
        this.setLocalData();
    }

    /**
     * @param {JSON} data
     */

    parseData(data){
        if(data['user']){
            this.user = data['user'];
        }
        if(data['firstName']){
            this.firstName = data['firstName'];
        }
        if(data['turma']){
            this.turma = data['turma'];
        }
        if(data['escola']){
            this.escola = data['escola'];
        }
    }
}
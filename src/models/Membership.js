class Membership{
    constructor(price){
        this.discount = price * 0.3;
        if(this.discount > 8000) discount = 8000;
    }

    getAppliedPrice(price){
        return price - this.discount;
    }
}

export default Membership;
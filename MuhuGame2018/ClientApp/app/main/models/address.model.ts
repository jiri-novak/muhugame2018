export class AddressModel {
    street: string;
    streetNumber: number;
    zipCode: number;
    municipality: string;
    state: string;

    static fromServerResponse(response: any): AddressModel {
        if (!response)
            return null;

        var model = new AddressModel();

        model.street = response.street;
        model.streetNumber = response.streetNumber;
        model.zipCode = response.zipCode;
        model.municipality = response.municipality;
        model.state = response.state;

        return model;
    }

    static fromServerResponseArray(response: any): Array<AddressModel> {        
        var models = new Array<AddressModel>();
        
        if (response) {
            models = response.map((value) => AddressModel.fromServerResponse(value));
        }

        return models;
    }

    toJson() {
        return {
            street : this.street,
            streetNumber: this.streetNumber,
            zipCode : this.zipCode,
            municipality : this.municipality,
            state : this.state            
        }
    }
}
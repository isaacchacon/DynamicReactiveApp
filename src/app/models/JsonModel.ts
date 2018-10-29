export class Property{
    idProperty: number
    name:string;
    status: string; // available or leased
    address:string;
    bedrooms:number;
    colonia: string;
    delegacion:string;
    floor:number;
    floorPlanPath:string;
    googleMapsLocation:string;
    mainImagePath:string;
    otherFeatures:string;
    surfaceArea:string;
    parkingSpaces:number;
    parkingDescription:null;
    propertyGroup:string;
    salesDescription:string;
    zipCode:string;

    ///joined expected properties:
    availability: string;// immediate or date available.
    //pending properties;


    //properties for intenal use in view:
    clicked:boolean;
    
    // pending: load all the images if requested perhaps?
    //expected to come already sorted.
    images:Image[];
}

export class Image{
    imagePath:string;
    description:string;
    order:number;
    title:string;
}
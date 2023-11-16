import { randomUUID } from 'crypto';
import * as fs from 'fs';
import path from 'path';

type StoreTills = {
    storeID: string,
    tills: [Till];
};

type Till = {
    number: string,
    dailyID: string,
    openTime: string,
    closeTime: string;
};

export const resolvers = {
    Query: {
        allTills: (_: any, args: { storeID: string; }) => {
            try {
                const allTills = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../../data/tillData.json"), { encoding: "utf-8" })) as { "data": StoreTills[]; };
                console.log(args.storeID);
                if (!allTills) {
                    throw new Error("Unable to return data for all tills.");
                }
                const storeData = allTills.data.find(store => store.storeID === args.storeID);

                if (!storeData) {
                    throw new Error("Unable to find data for indicated store.");
                }

                return storeData;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        },

        tillInfo: (_: any, args: { number: string; }) => {
            try {
                const allTills = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../../data/tillData.json"), { encoding: "utf-8" })) as { "data": StoreTills[]; };

                if (!allTills) {
                    throw new Error("Unable to return data.");
                }

                const tillData = allTills.data[0]["tills"].find(till => till.number === args.number);

                if (!tillData) {
                    throw new Error("Unable to find data for indicated till.");
                }

                return tillData;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        },
        singleTransaction: (_: any, id: string) => {
            return false;
        }
    },
    Mutation: {
        openTill (_: any, args: { number: string; }) {
            try {
                const allTills = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../../data/tillData.json"), { encoding: "utf-8" })) as { "data": StoreTills[]; };

                if (!allTills) {
                    throw new Error("Unable to return data.");
                }
                const tillData = allTills.data[0]["tills"].find(till => till.number === args.number);
                const tillIndex = allTills.data[0]["tills"].findIndex(till => till.number === args.number);


                if (!tillData) {
                    throw new Error("Unable to find data for indicated till.");
                }

                if (tillData.openTime) {
                    throw new Error("Till has already been opened.");
                }

                tillData.openTime = (new Date).toDateString();
                tillData.dailyID = randomUUID();
                allTills.data[0]["tills"][tillIndex] = tillData;
                fs.writeFileSync(path.resolve(__dirname, "../../../../../data/tillData.json"), JSON.stringify(allTills), { encoding: "utf-8" });
                return tillData;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        },
        closeTill (_: any, args: { number: string; }) {
            try {
                const allTills = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../../data/tillData.json"), { encoding: "utf-8" })) as { "data": StoreTills[]; };

                if (!allTills) {
                    throw new Error("Unable to return data.");
                }
                const tillData = allTills.data[0]["tills"].find(till => till.number === args.number);
                const tillIndex = allTills.data[0]["tills"].findIndex(till => till.number === args.number);


                if (!tillData) {
                    throw new Error("Unable to find data for indicated till.");
                }

                if (tillData.closeTime || !tillData.openTime) {
                    throw new Error("Till has already been closed or is not open.");
                }

                tillData.closeTime = (new Date).toDateString();
                allTills.data[0]["tills"][tillIndex] = tillData;
                fs.writeFileSync(path.resolve(__dirname, "../../../../../data/tillData.json"), JSON.stringify(allTills), { encoding: "utf-8" });
                return tillData;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
    }
};
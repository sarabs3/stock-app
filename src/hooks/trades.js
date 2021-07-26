import { Auth, DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import { UserTrades } from "../models";

const useTrade = () => {
    const [trades, updateTrades] = useState([]);
    const getTrades = async () => {
        const models = await DataStore.query(UserTrades);
        return models;
    }

    const getUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser();
            return authUser;

        } catch (e) {
            console.log('error in fetching user', e);
        }
    };
    useEffect(() => {
        getUser().then((user) => {
            getTrades().then(data => {
                const currentUserData = data.filter(f => f.userId === user.attributes.sub);
                updateTrades(currentUserData);
            })

        })
    }, []);

    return trades;
};

export default useTrade;

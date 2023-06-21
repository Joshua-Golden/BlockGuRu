import { Redirect } from 'expo-router';

export default class Index {
    render() {
        return (
            <Redirect href='home' />
        )
    }
};
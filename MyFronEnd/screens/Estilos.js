import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#001f3f',
    },
    scrollContainer: {
        backgroundColor: '#001f3f',
    },
    datos: {
        color: 'white'
    },
    datosBold: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    title: {
        color: '#AFCAF3',
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 16
    },
    texto: {
        color: '#AFCAF3'
    },
    container: {
        backgroundColor: '#4183D1',
        marginHorizontal: 15,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10
    },
    hContainer: {
        marginRight: 25,
        alignItems: 'center',
    },
    vContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    datosContainer: {
        alignItems: 'center',
        marginBottom: 10,
        padding: 30
    },
    lugar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 60,
        marginTop: 0
    },
    temperatura: {
        color: 'white',
        fontSize: 80,
        marginTop: -30,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001f3f',
    },
    mapContainer: {
        height: 200,
        margin: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
});

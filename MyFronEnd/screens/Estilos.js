import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#87CEEB', // Azul cielo
    },
    scrollContainer: {
        backgroundColor: '#87CEEB', // Azul cielo
        paddingTop: 40, // Añadir padding superior para separar del borde superior
    },
    scrollContent: {
        paddingBottom: 20, // Añadir padding inferior para asegurar que todo el contenido sea visible
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
        color: '#002366',
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 18,
        textAlign: 'center',
    },
    texto: {
        color: '#002366'
    },
    container: {
        backgroundColor: '#4682B4',
        marginHorizontal: 15,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10
    },
    airQualityContainer: {
        backgroundColor: '#4682B4',
        marginHorizontal: 15,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    hContainer: {
        marginRight: 25,
        alignItems: 'center',
    },
    vContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    datosContainer: {
        alignItems: 'center',
        marginBottom: 10,
        padding: 20,
        backgroundColor: '#4682B4',
        borderRadius: 20,
        marginHorizontal: 15,
    },
    lugar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
    },
    temperatura: {
        color: 'white',
        fontSize: 80,
        textAlign: 'center',
    },
    degreeSymbol: {
        color: 'white',
        fontSize: 24,
        marginTop: -45,
        marginLeft: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87CEEB', // Azul cielo
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
    centered: {
        alignItems: 'center',
    },
    card: {
        justifyContent: 'space-between',
        backgroundColor: '#4682B4',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    icon: {
        height: 50,
        width: 50,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 20,
    },
    column: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#4682B4',
        borderRadius: 20,
        padding: 15,
        marginHorizontal: 5,
    },
    datoItem: {
        borderBottomColor: '#AFCAF3',
        borderBottomWidth: 0.2,
        paddingBottom: 3,
        marginBottom: 5,
    },
    horizontalWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        paddingHorizontal: 15,
    }
});

import React, { useState, useRef } from 'react';
import { Image, View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Price = [
    {
        monthPrice: {
            price: '12.99',
            note: [
                'Ad-free listening',
                'Download to listen offline',
                'Access full catalog Premium',
                'High sound quality',
                'Cancel anytime',
            ],
        },
    },
    {
        yearPrice: {
            price: '155.55',
            note: [
                'Ad-free listening',
                'Download to listen offline',
                'Access full catalog Premium',
                'High sound quality',
                'Cancel anytime',
            ],
        },
    },
    {
        weekPrice: {
            price: '0.99',
            note: [
                'Ad-free listening',
                'Download to listen offline',
                'Access full catalog Premium',
                'High sound quality',
                'Cancel anytime',
            ],
        },
    },
];

export default function PremiumChoiceScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = 300;
    const flatListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / (itemWidth + 20));
        setActiveIndex(index);
    };

    const handleDotPress = (index) => {
        setActiveIndex(index);
        flatListRef.current.scrollToIndex({ index, animated: true });
    };

    return (
        <LinearGradient
            colors={['#F1916D', '#7A47AE', '#551FB3', '#551FB3', '#551FB3', '#551FB3','#E22FED' ]}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <Image style={styles.imgBack} source={require('../all_images/Launch Screen - Premium/Rectangle 6.png')} />
                <View style={{flex:1, marginTop:50}}>
                    <Text style={styles.title}>Unlimited </Text>
                    <Text style={styles.title}>music selections</Text>
                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={Price}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        pagingEnabled
                        snapToInterval={itemWidth + 20}
                        decelerationRate="fast"
                        contentContainerStyle={{
                            paddingLeft: (screenWidth - itemWidth) / 2,
                            paddingRight: (screenWidth - itemWidth) / 2,
                        }}
                        renderItem={({ item }) => {
                            const packageDetails = item.monthPrice || item.yearPrice || item.weekPrice;
                            return (
                                <View style={styles.packageContainer}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Premium</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={styles.freeTrialBadge}>
                                            <Text style={{ color: '#7A47AE' }}>For free 1 month</Text>
                                        </View>
                                        
                                            <Text style={styles.price}>${packageDetails.price}/ month</Text>
                                        
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        {packageDetails.note.map((note, index) => (
                                            <Text key={index} style={styles.note}>• {note}</Text>
                                        ))}
                                    </View>
                                    <TouchableOpacity style={styles.subscribeButton}>
                                        <Text style={{ color: 'white' }}>Subscribe now</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.dotsContainer}>
                    {Price.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dot,
                                { backgroundColor: activeIndex === index ? '#333' : '#bbb' }
                            ]}
                            onPress={() => handleDotPress(index)}
                        />
                    ))}
                </View>
                <View style={styles.backHomeContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('PremiumScreen')}>
                        <Text style={styles.backHomeText}>Back home</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    flatListContainer: {
        flex:3,
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    packageContainer: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 10,
        width: 250,
        height: 300,
    },
    price: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    note: {
        fontSize: 14,
        alignItems:'center',
        color: '#555',
        marginVertical: 2,
    },
    dotsContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    imgBack: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    freeTrialBadge: {
        backgroundColor: '#e9e9e9',
        width: 120,
        height: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscribeButton: {
        width: 200,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
    },
    backHomeContainer: {
        flex:1,
        alignItems: 'center',
        marginBottom: 20,
    },
    backHomeText: {
        color: 'white',
        fontSize: 18,
    },
});

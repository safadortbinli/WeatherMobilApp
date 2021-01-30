import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from "./assets/c.jpg";
import { TextInput } from "react-native-gesture-handler";
import Deneme from "./assets/03n.png";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import { Divider } from "react-native-elements";

export default class App extends React.Component {
  state = {
    city: "",
  };

  constructor() {
    super();
    this.state = {
      data: [],
      refreshing: false,
      setRefreshing: false,
    };
  }

  yaz = () => {
    this.getPost();
    this.getSaat();
  };

  componentDidMount() {}

  async getPost() {
    let veri = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        this.state.city +
        ",tr&appid=108fd1c9f6b7579bd9627d786e34de43&lang=tr&&units=metric"
    );
    let jsonVeri = await veri.json();

    this.setState({
      data: jsonVeri,
      temp: parseInt(jsonVeri.main.temp),
      hissedilen: parseInt(jsonVeri.main.feels_like),
      minSicaklik: parseInt(jsonVeri.main.temp_min),
      maxSicaklik: parseInt(jsonVeri.main.temp_max),
      ruzgar: jsonVeri.wind.speed,
      city: jsonVeri.name,
      durum: jsonVeri.weather[0].description,
      nem: jsonVeri.main.humidity,
      resim:
        "http://openweathermap.org/img/w/" + jsonVeri.weather[0].icon + ".png",
      country: jsonVeri.sys.country,
      basinc: jsonVeri.main.pressure,
      bulut: jsonVeri.clouds.all,
    });
  }

  //http://jsonviewer.stack.hu/#https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=108fd1c9f6b7579bd9627d786e34de43&lang=tr&units=metric
  async getSaat() {
    let veri2 = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
        this.state.city +
        ",tr&appid=108fd1c9f6b7579bd9627d786e34de43&lang=tr&units=metric"
    );
    let jsonVeri2 = await veri2.json();

    this.setState({
      data: jsonVeri2,
      hava: jsonVeri2.list,
    });
  }

  arama = () => {
    return (
      <View nativeID="arama çubugu" style={{ justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: "skyblue",
            width: wp("95%"),
            height: hp("5.2%"),
            marginTop: hp("10%"),
            borderRadius: 15,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 0.5,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              backgroundColor: "white",
            }}
          ></View>
          <View
            style={{
              flex: 2.3,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{ alignItems: "center", width: wp("68%") }}
              placeholder="Arama yapmak için yazınız..."
              placeholderTextColor="gray"
              value={this.state.city}
              onChangeText={(city) => this.setState({ city })}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 0.6,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: "center",
            }}
            onPress={this.yaz}
          >
            <View
              style={{
                flex: 0.6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="md-search" size={27} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  listOne = () => {
    return (
      <View
        nativeID="hava durumu 1"
        style={{
          height: hp("25%"),
          width: wp("95%"),
          marginTop: hp("1%"),
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ left: 10 }}>
            <Image
              source={{ uri: this.state.resim }}
              style={{ width: wp("40%"), height: hp("25%") }}
            ></Image>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ alignItems: "center", marginTop: hp("4%") }}>
            <Text style={{ fontSize: 20, color: "black" }}>
              {this.state.city}{" "}
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: hp("0%") }}>
            <Text style={{ fontSize: 60, color: "black" }}>
              {this.state.temp}°C{" "}
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {this.state.durum}{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  listTrue = () => {
    return (
      <View
        nativeID="Hava durumu 2"
        style={{
          height: hp("20%"),
          width: wp("95%"),
          flexDirection: "row",
          marginTop: hp("2%"),
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: 0.2,
            borderColor: "gray",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center", right: 3 }}>
            <MaterialCommunityIcons
              name="weather-windy-variant"
              size={35}
              color="black"
            />
          </View>

          <View style={{ alignItems: "center", marginTop: hp("1%"), left: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {this.state.ruzgar} <Text style={{ fontSize: 10 }}>Km/Sa</Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 0.2,
            borderColor: "gray",
            left: 2,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Entypo name="drop" size={30} color="black" />
          </View>

          <View
            style={{ alignItems: "center", marginTop: hp("1.8%"), right: 3 }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              <Text style={{ fontSize: 15 }}>%</Text> {this.state.nem}{" "}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 0.2,
            borderColor: "gray",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center", marginTop: hp("0.4%") }}>
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={30}
              color="black"
            />
          </View>

          <View
            style={{ alignItems: "center", marginTop: hp("1.4%"), right: 3 }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              {this.state.basinc} <Text style={{ fontSize: 11 }}>hPa</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  listTree = () => {
    return (
      <View
        nativeID="Hava durumu 3"
        style={{
          height: hp("20%"),
          width: wp("95%"),
          flexDirection: "row",
          marginTop: hp("2%"),
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: 0.2,
            borderColor: "gray",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center", right: 3 }}>
            <FontAwesome5 name="cloud-rain" size={28} color="black" />
          </View>

          <View style={{ alignItems: "center", marginTop: hp("1%"), left: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {this.state.bulut} <Text style={{ fontSize: 10 }}>Mm</Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 0.2,
            borderColor: "gray",
            left: 2,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Ionicons name="ios-sunny" size={32} color="black" />
          </View>

          <View
            style={{ alignItems: "center", marginTop: hp("0.9%"), right: 3 }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              {this.state.minSicaklik}°C{" "}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 0.2,
            borderColor: "gray",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center", marginTop: hp("0%") }}>
            <MaterialIcons name="wb-sunny" size={29} color="black" />
          </View>

          <View style={{ alignItems: "center", marginTop: hp("1%"), right: 3 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              {this.state.maxSicaklik}°C
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderItemDay = ({ item }) => {
    return (
      <View
        nativeID="satırlar"
        style={{ flexDirection: "row", marginTop: hp("2%") }}
      >
        <View
          nativeID="kalıp"
          style={{
            backgroundColor: "white",
            width: wp("30%"),
            marginLeft: wp("1%"),
            height: hp("27%"),
            maxHeight: hp("30%"),
            marginTop: hp("2%"),
            borderRadius: 5,
            flexDirection: "column",
          }}
        >
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {item.dt_txt.substring(8, 10)}
              {item.dt_txt.substring(5, 7) == "01"
                ? " Ocak"
                : item.dt_txt.substring(5, 7) == "02"
                ? " Şubat"
                : item.dt_txt.substring(5, 7) == "03"
                ? " Mart"
                : item.dt_txt.substring(5, 7) == "04"
                ? " Nisan"
                : item.dt_txt.substring(5, 7) == "05"
                ? " Mayıs"
                : item.dt_txt.substring(5, 7) == "06"
                ? " Haziran"
                : item.dt_txt.substring(5, 7)}
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 13 }}>
            <Image
              source={Deneme}
              style={{ width: wp("20%"), height: hp("5.5%") }}
            ></Image>
          </View>

          <View style={{ alignItems: "center", marginTop: 7 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 9,
                textTransform: "uppercase",
              }}
            >
              {item.weather[0].description}
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 7 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {parseInt(item.main.temp)}°C
            </Text>
          </View>

          <View style={{ marginTop: hp("2%"), flexDirection: "row" }}>
            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <View style={{}}>
                <MaterialCommunityIcons
                  name="weather-windy-variant"
                  size={20}
                  color="black"
                />
              </View>
              <View style={{}}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  {parseInt(item.wind.speed)}{" "}
                  <Text style={{ fontSize: 5 }}>Km/Sa</Text>
                </Text>
              </View>
            </View>

            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <View style={{}}>
                <Fontisto name="rain" size={17} color="black" />
              </View>
              <View style={{ top: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  {item.clouds.all} <Text style={{ fontSize: 5 }}>Mm</Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                bottom: 2,
              }}
            >
              <View style={{}}>
                <Entypo name="drop" size={17} color="black" />
              </View>
              <View style={{ top: 5 }}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  <Text style={{ fontSize: 5 }}>%</Text>
                  {item.main.humidity}{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderItemClock = ({ item, index }) => {
    return 0 < index && index < 8 ? (
      <View
        nativeID="satırlar"
        style={{ flexDirection: "row", marginTop: hp("2%") }}
      >
        <View
          nativeID="kalıp"
          style={{
            backgroundColor: "white",
            width: wp("30%"),
            marginLeft: wp("1%"),
            height: hp("30%"),
            maxHeight: hp("34%"),
            marginTop: hp("2%"),
            borderRadius: 5,
            flexDirection: "column",
          }}
        >
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 10 }}>
              {item.dt_txt.substring(8, 10)}
              {item.dt_txt.substring(5, 7) == "01"
                ? " Ocak"
                : item.dt_txt.substring(5, 7) == "02"
                ? " Şubat"
                : item.dt_txt.substring(5, 7) == "03"
                ? " Mart"
                : item.dt_txt.substring(5, 7) == "04"
                ? " Nisan"
                : item.dt_txt.substring(5, 7) == "05"
                ? " Mayıs"
                : item.dt_txt.substring(5, 7) == "06"
                ? " Haziran"
                : item.dt_txt.substring(5, 7)}
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {item.dt_txt.substring(11, 16)}
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 13 }}>
            <Image
              source={Deneme}
              style={{ width: wp("20%"), height: hp("5.5%") }}
            />
          </View>

          <View style={{ alignItems: "center", marginTop: 7 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 9,
                textTransform: "uppercase",
              }}
            >
              {item.weather[0].description}
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 7 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {parseInt(item.main.temp)}°C
            </Text>
          </View>

          <View style={{ marginTop: hp("2%"), flexDirection: "row" }}>
            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <View style={{}}>
                <MaterialCommunityIcons
                  name="weather-windy-variant"
                  size={20}
                  color="black"
                />
              </View>
              <View style={{}}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  {parseInt(item.wind.speed)}{" "}
                  <Text style={{ fontSize: 5 }}>Km/Sa</Text>
                </Text>
              </View>
            </View>

            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <View style={{}}>
                <Fontisto name="rain" size={17} color="black" />
              </View>
              <View style={{ top: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  {item.clouds.all} <Text style={{ fontSize: 5 }}>Mm</Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                bottom: 2,
              }}
            >
              <View style={{}}>
                <Entypo name="drop" size={17} color="black" />
              </View>
              <View style={{ top: 5 }}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  <Text style={{ fontSize: 5 }}>%</Text>
                  {item.main.humidity}{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    ) : null;
  };

  render() {
    return (
      <ImageBackground
        source={Back}
        style={{ height: hp("100%"), opacity: 1 }}
        resizeMode="cover"
        resizeMethod="auto"
      >
        <View
          nativeID="Ana View"
          style={{
            height: "auto",
            flexDirection: "column",
            marginHorizontal: wp("2%"),
            alignItems: "center",
          }}
        >
          <ScrollView style={{ marginBottom: "5%" }}>
            {this.arama()}
            {this.listOne()}
            {this.listTrue()}
            {this.listTree()}

            <View
              style={{
                marginLeft: wp("2%"),
                height: hp("17%"),
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontSize: 15 }}>Saat Bazlı Hava Raporu</Text>
              <Divider style={{ backgroundColor: "black" }} />
            </View>

            <FlatList
              nativeID="Saatlik Rapor"
              data={this.state.hava}
              horizontal={true}
              // numColumns={3}
              renderItem={this.renderItemClock}
            />

            <View
              style={{
                marginLeft: wp("2%"),
                height: hp("6%"),
                justifyContent: "flex-end",
                marginTop: hp("1%"),
              }}
            >
              <Text style={{ fontSize: 15 }}>7 Günlük Hava Raporu</Text>
              <Divider style={{ backgroundColor: "black" }} />
            </View>

            <FlatList
              nativeID="Haftalık Rapor"
              data={this.state.hava}
              horizontal={true}
              // numColumns={3}
              renderItem={this.renderItemDay}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

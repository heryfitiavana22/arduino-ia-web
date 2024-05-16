#include <ESP8266WiFi.h>
#define ssid "host_name"
#define password "host_pasword"
#define MAX_REQUESTS 10
#define LED_BLUE D3
#define LED_RED D5

WiFiServer server(5000);

struct CommandLed {
  String color;
  unsigned long startTime;
  unsigned long delayTime;
  bool on;
};

CommandLed commandsLed[MAX_REQUESTS];
int lastIndex = 0;

bool addCommandLed(String color, unsigned long delayTime, bool on) {
  if (lastIndex < MAX_REQUESTS) {
    commandsLed[lastIndex].color = color;
    commandsLed[lastIndex].startTime = millis();
    commandsLed[lastIndex].delayTime = delayTime;
    commandsLed[lastIndex].on = on;
    lastIndex++;
    return true;
  }
  return false;
}

void clearCommandLed(int index) {
  for (int i = index; i < lastIndex - 1; i++) {
    commandsLed[i] = commandsLed[i + 1];
  }
  lastIndex--;
}

void processCommandLed() {
  unsigned long currentMillis = millis();
  for (int i = 0; i < lastIndex; i++) {
    if (currentMillis - commandsLed[i].startTime >= commandsLed[i].delayTime) {
      if (commandsLed[i].color == "red") {
        digitalWrite(LED_RED, commandsLed[i].on ? HIGH : LOW);
      } else if (commandsLed[i].color == "blue") {
        digitalWrite(LED_BLUE, commandsLed[i].on ? HIGH : LOW);
      }
      clearCommandLed(i);
    }
  }
}


bool requestCommandLed(String request) {
  Serial.println("request : " +  request); 

  if(request.indexOf("/led") != -1) {
    int colorIndex = request.indexOf("color=");
    int delayIndex = request.indexOf("delay=");
    int actionIndex = request.indexOf("action=");
    int httpIndex = request.indexOf(" HTTP");
    
    if (colorIndex != -1 && delayIndex != -1 & actionIndex != -1) {
      String color = request.substring(colorIndex + 6, delayIndex - 1);
      int delayTime = request.substring(delayIndex + 6, actionIndex - 1).toInt();
      String action = request.substring(actionIndex + 7, httpIndex);
      return addCommandLed(color, delayTime, action == "off" ? false : true);
    }
  }
  return false;
}

void setup()
{
  Serial.begin(115200);
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
  Serial.println("Connexion au serveur ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(2000);
    Serial.print(".");
  }
  
  Serial.println("WiFi connecté");
  Serial.print("IP : ");
  Serial.print(WiFi.localIP());
  Serial.println(":5000");

  server.begin();
  Serial.println("Serveur démarré");
}

void loop()
{
  processCommandLed();
  WiFiClient client = server.available();
  if (!client) return;

  String request = client.readStringUntil('\r');
  client.println("Access-Control-Allow-Origin: *");
  if(requestCommandLed(request)) {
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/plain");
    client.println("");
    client.println("OK");
  } else {
    client.println("HTTP/1.1 400 Bad Request");
    client.println("Content-Type: text/plain");
    client.println("");
    client.println("K0");
  }
  // client.stop();
  Serial.println("Client déconnecté");
}

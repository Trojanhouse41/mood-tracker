import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// --- STEP 2: Build the MoodButton Component ---
function MoodButton({ emoji, label }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

// --- Main App Component ---
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker 📝</Text>

      {/* A row to hold our 4 mood buttons */}
      <View style={styles.row}>
        <MoodButton emoji="😊" label="Happy" />
        <MoodButton emoji="😢" label="Sad" />
        <MoodButton emoji="" label="Tired" />
        <MoodButton emoji="🤩" label="Excited" />
      </View>
    </View>
  );
}

// --- Styling ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 400,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "22%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
});
n;

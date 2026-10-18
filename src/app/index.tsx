import * as Haptics from "expo-haptics"; // Built-in vibration feature
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- MoodButton Component ---
function MoodButton({ emoji, label, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

// --- Main Screen Component ---
export default function Home() {
  const [counts, setCounts] = useState({
    happy: 0,
    sad: 0,
    tired: 0,
    excited: 0,
    angry: 0,
    calm: 0,
  });

  const updateCount = (mood) => {
    // Trigger a tiny vibration when tapped (Works on phone!)
    Haptics.selectionAsync();

    setCounts({
      ...counts,
      [mood]: counts[mood] + 1,
    });
  };

  // ✅ UNTOUCHED RESET BUTTON LOGIC
  const resetCounts = () => {
    setCounts({ happy: 0, sad: 0, tired: 0, excited: 0, angry: 0, calm: 0 });
  };

  // --- CALCULATIONS ---
  const totalLogs = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0,
  );
  const maxCount = Math.max(...Object.values(counts));

  // Find the leading mood
  const leadingMood =
    maxCount > 0
      ? Object.keys(counts).find((key) => counts[key] === maxCount)
      : null;

  // Dynamic Messages
  const moodMessages = {
    happy: "Keep that good energy going! ✨",
    sad: "It's okay to take a break today. 💙",
    tired: "Make sure to get some rest soon. 💤",
    excited: "Love the enthusiasm! Let's go! 🚀",
    angry: "Take a deep breath. You've got this. 🌬️",
    calm: "Enjoy this peaceful moment. 🍃",
  };

  // Colors for progress bars
  const moodColors = {
    happy: "#FFD700",
    sad: "#4682B4",
    tired: "#9370DB",
    excited: "#FF6347",
    angry: "#DC143C",
    calm: "#3CB371",
  };

  const getPercentage = (count) =>
    totalLogs === 0 ? 0 : Math.round((count / totalLogs) * 100);

  // Current Date & Time
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ScrollView
      style={[styles.scrollContainer, { backgroundColor: "#f5f5f5" }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.innerContainer}>
        {/* 1. DATE & TIME HEADER */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{dateStr}</Text>
          <Text style={styles.timeText}>{timeStr}</Text>
        </View>

        <Text style={styles.title}>Mood Tracker 📝</Text>

        {/* 2. DYNAMIC MOOD MESSAGE */}
        {leadingMood && (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{moodMessages[leadingMood]}</Text>
          </View>
        )}

        {/* BUTTONS */}
        <View style={styles.row}>
          <MoodButton
            emoji="😊"
            label="Happy"
            onPress={() => updateCount("happy")}
          />
          <MoodButton
            emoji="😢"
            label="Sad"
            onPress={() => updateCount("sad")}
          />
          <MoodButton
            emoji="😴"
            label="Tired"
            onPress={() => updateCount("tired")}
          />
          <MoodButton
            emoji="🤩"
            label="Excited"
            onPress={() => updateCount("excited")}
          />
        </View>
        <View style={styles.row}>
          <MoodButton
            emoji="😡"
            label="Angry"
            onPress={() => updateCount("angry")}
          />
          <MoodButton
            emoji="😌"
            label="Calm"
            onPress={() => updateCount("calm")}
          />
        </View>

        {/* 3. LOG WITH PROGRESS BARS */}
        <View style={styles.resultsBox}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Your Log</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Total: {totalLogs}</Text>
            </View>
          </View>

          {totalLogs === 0 ? (
            <Text style={styles.emptyState}>
              Tap a mood above to start tracking!
            </Text>
          ) : (
            Object.entries(counts).map(([mood, count]) => {
              const isWinner = count === maxCount && maxCount > 0;
              const percentage = getPercentage(count);

              return (
                <View key={mood} style={styles.logRow}>
                  <View style={styles.logTextRow}>
                    <Text
                      style={
                        isWinner ? styles.highlightText : styles.resultText
                      }
                    >
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </Text>
                    <Text style={styles.countText}>
                      {count} ({percentage}%)
                    </Text>
                  </View>
                  {/* The Visual Progress Bar */}
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${percentage}%`,
                          backgroundColor: moodColors[mood],
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* ✅ UNTOUCHED RESET BUTTON */}
        <TouchableOpacity style={styles.resetButton} onPress={resetCounts}>
          <Text style={styles.resetText}>Reset All</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

// --- Styling ---
const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20, paddingTop: 50 },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },

  // Date Header Styles
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  dateText: { fontSize: 14, color: "#888", fontWeight: "600" },
  timeText: { fontSize: 14, color: "#007AFF", fontWeight: "bold" },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },

  // Message Box Styles
  messageBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
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
  emoji: { fontSize: 32 },
  label: { marginTop: 8, fontSize: 14, fontWeight: "600", color: "#555" },

  resultsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  resultsTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  badge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  emptyState: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
  },

  // Log & Progress Bar Styles
  logRow: { width: "100%", marginVertical: 8 },
  logTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  resultText: { fontSize: 16, color: "#555", fontWeight: "600" },
  highlightText: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },
  countText: { fontSize: 14, color: "#888" },
  progressTrack: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  progressBar: { height: "100%", borderRadius: 4 },

  resetButton: {
    backgroundColor: "#ff4757",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

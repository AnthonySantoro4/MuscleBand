#include "data_processing.h"
#include <algorithm>

static double leftStrength = 0.0;
static double rightStrength = 0.0;

// Helper function: average of top 3 values
double getTopThreeAvg(const std::vector<double>& data) {
  if (data.empty()) return 0.0;

  std::vector<double> sorted = data;
  std::sort(sorted.begin(), sorted.end(), std::greater<double>()); // Descending order

  int count = std::min(3, (int)sorted.size());
  double sum = 0.0;
  for (int i = 0; i < count; i++) {
    sum += sorted[i];
  }

  return sum / count;
}

void processEMGData(const std::vector<double>& leftData, const std::vector<double>& rightData) {
  leftStrength = getTopThreeAvg(leftData);
  rightStrength = getTopThreeAvg(rightData);
}

double getLeftStrength() {
  return leftStrength;
}

double getRightStrength() {
  return rightStrength;
}

double getPercentageDifference() {
  double maxVal = std::max(leftStrength, rightStrength);
  if (maxVal == 0.0) return 0.0;

  return 100.0 * std::abs(leftStrength - rightStrength) / maxVal;
}

String getSeverityGrade() {
  double diff = getPercentageDifference();

  if (diff < 10.0) return "SAFE";
  else if (diff < 15.0) return "MODERATE";
  else if (diff < 20.0) return "SEVERE";
  else return "DANGEROUS";
}

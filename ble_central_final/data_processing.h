#ifndef DATA_PROCESSING_H
#define DATA_PROCESSING_H

#include <vector>
#include <Arduino.h>

// === Main Processing Functions ===
void processEMGData(const std::vector<double>& left, const std::vector<double>& right);

// === Results ===
double getLeftStrength();
double getRightStrength();
double getPercentageDifference();
String getSeverityGrade();

// === Optional Utility (for testing or future use) ===
double getTopThreeAvg(const std::vector<double>& data);

#endif

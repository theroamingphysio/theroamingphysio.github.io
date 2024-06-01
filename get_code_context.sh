#!/bin/bash

# Use the current directory as the project directory
project_dir=$(pwd)

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/code_context.txt"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# List of file types to ignore
ignore_files=("*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg" "*.sh")

# Function to check if a file should be ignored
should_ignore_file() {
  local file=$1
  for pattern in "${ignore_files[@]}"; do
    if [[ $file == $pattern ]]; then
      return 0
    fi
  done
  return 1
}

# Function to append file content to output file
append_file_content() {
  local file=$1
  relative_path=${file#"$project_dir/"}
  echo "// File: $relative_path" >> "$output_file"
  cat "$file" >> "$output_file"
  echo -e "\n\n" >> "$output_file"
}

# Process all files in the root directory
for file in "$project_dir"/*; do
  if [ -f "$file" ]; then
    if ! should_ignore_file "$file"; then
      append_file_content "$file"
    fi
  fi
done

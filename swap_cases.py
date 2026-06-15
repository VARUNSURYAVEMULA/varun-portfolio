import sys

with open('src/components/CaseStudies.jsx', 'r') as f:
    content = f.read()

part1_start = content.find("  {\n    id: 1,")
part1_end = content.find("  },\n\n  {\n    id: 3,") + 4

part2_start = content.find("  {\n    id: 3,")
part2_end = content.find("  },\n  {\n    id: 5,") + 4

if part1_start == -1 or part2_start == -1:
    print("Could not find blocks")
    sys.exit(1)

part1 = content[part1_start:part1_end]
part2 = content[part2_start:part2_end]

# we just need to replace the combined section
combined_start = part1_start
combined_end = part2_end

new_combined = part2 + "\n" + part1.strip() + ",\n"

new_content = content[:combined_start] + new_combined + content[combined_end:]

with open('src/components/CaseStudies.jsx', 'w') as f:
    f.write(new_content)

print("Swapped successfully")

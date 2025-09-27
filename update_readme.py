import json

# Load contributors.json
with open("contributors.json", "r", encoding="utf-8") as f:
    contributors = json.load(f)

# Build contributors markdown
maintainers = []
contributors_list = []

for person in contributors:
    if not person["name"].strip():
        continue  # skip empty entries
    
    block = f'''<a href="{person["github"]}">
  <img src="{person["avatar"]}" width="80" style="border-radius:50%"/>
</a>  
**{person["name"]}** – [GitHub]({person["github"]})  
'''
    if person["role"].lower() == "maintainer":
        maintainers.append(block)
    else:
        contributors_list.append(block)

# Read README.md
with open("README.md", "r", encoding="utf-8") as f:
    readme = f.read()

# Replace between markers
start_marker = "<!-- CONTRIBUTORS START -->"
end_marker = "<!-- CONTRIBUTORS END -->"

before = readme.split(start_marker)[0]
after = readme.split(end_marker)[1] if end_marker in readme else ""

new_section = start_marker + "\n\n"
if maintainers:
    new_section += "### Maintainers\n\n" + "\n---\n".join(maintainers) + "\n\n"
if contributors_list:
    new_section += "### Contributors\n\n" + "\n---\n".join(contributors_list) + "\n\n"
new_section += end_marker

# Write updated README
with open("README.md", "w", encoding="utf-8") as f:
    f.write(before + new_section + after)

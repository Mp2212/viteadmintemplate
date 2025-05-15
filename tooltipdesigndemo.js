<li
  v-for="(line, listIndex) in parsedVulnerableVersions"
  :key="listIndex"
>
  <ul v-if="parsedVulnerableVersions.length > 0" class="details-list p-0">
    <li
      v-for="(version, index) in getOnlyVersion(line)"
      :key="index"
      class="tooltip-container"
    >
      <span
        class="info-icon-wrapper"
        @mouseenter="() => activeTooltipIndex = `${listIndex}-${index}`"
        @mouseleave="() => activeTooltipIndex = null"
      >
        {{ version.vulnerable }}
        <div
          v-if="activeTooltipIndex === `${listIndex}-${index}`"
          class="tooltip-bubble-inline"
        >
          <i class="fas fa-check-circle tooltip-icon-inside"></i>
          <span>
            <strong>
              {{ version.recommended && version.recommended.trim() !== '' 
                ? 'Recommended Version is ' + version.recommended 
                : 'No Recommended Version available' }}
            </strong>
          </span>
          <div class="tooltip-arrow-inline"></div>
        </div>
      </span>
    </li>


function getOnlyVersion(label) {
  const parts = label.split('|');
  const vulnerableList = parts[0]
    ?.split(',')
    .map(v => v.trim().replace(/\s*\.jar$/, '').replace('.jar', '')) || [];

  const recommendedList = (parts.length > 1 && parts[1])
    ? parts[1].split(/,\s*/).map(v => v.trim())
    : [];

  return vulnerableList.map((vuln, index) => {
    const recommended = recommendedList[index];
    const hasPipe = parts.length > 1;
    return {
      vulnerable: vuln,
      recommended: hasPipe && recommended?.trim()
        ? recommended
        : hasPipe
        ? 'No Recommended Version Available'
        : null
    };
  });
}
# Prompt Chain Improvements: Domain Boundaries & Anti-Pattern Detection

This PR improves the prompt chain to better detect and enforce domain-specific architectural constraints, preventing implementations that don't fit the application's intended purpose.

## Problem Addressed

The original prompt chain generated instruction files that didn't adequately prevent architectural violations. For example, when asked to "add a Binary Tree Fractal" to a chaos game theory application, the generated instructions allowed implementation of:

- ❌ Recursive line-drawing algorithms (wrong for chaos game domain)
- ❌ Custom canvas handling (bypassing established `useCanvas` service) 
- ❌ Non-point-based rendering (violating chaos game methodology)

## Key Improvements

### 1. **Enhanced Domain Analysis** (`01-determine-project.txt`)
- **Added**: Domain specificity analysis to identify application boundaries
- **Added**: Core mathematical/business concept detection
- **Added**: Scope definition (what features fit vs. don't fit)

### 2. **Architectural Constraint Detection** (`03-identify-architecture.txt`)
- **Added**: Required vs. optional pattern identification
- **Added**: Mandatory service/hook detection
- **Added**: Anti-pattern identification
- **Changed**: Output format to include constraints and anti-patterns

### 3. **Domain Boundary Enforcement** (`08-create-instructions.txt`)
- **Added**: Domain Boundaries section in instruction output
- **Added**: Required Architecture Patterns section
- **Added**: Anti-Patterns section with explicit "DO NOT" guidance
- **Added**: Implementation Validation Checklist
- **Enhanced**: Behavioral guidance to reject inappropriate features

### 4. **Domain-Specific Validation** (`09a-domain-validation.txt` - NEW)
- **Added**: Test inappropriate feature requests against instructions
- **Added**: Verify required pattern enforcement
- **Added**: Anti-pattern detection testing
- **Added**: Gap analysis for instruction improvements

### 5. **Final Instruction Refinement** (`10-final-instruction-update.txt` - NEW)
- **Added**: Address validation gaps
- **Added**: Strengthen domain boundaries
- **Added**: Feature request evaluation guidance

## Specific Architectural Issues Prevented

The improved prompts would now detect and prevent:

### For Chaos Game Applications:
- ✅ Line-drawing fractals (Binary Tree, Koch curves, L-systems)
- ✅ Pixel-based fractals (Mandelbrot, Julia sets)
- ✅ 3D visualizations 
- ✅ Custom canvas manipulation bypassing `useCanvas`
- ✅ Non-point-based rendering algorithms

### General Anti-Patterns:
- ✅ Bypassing established service layers
- ✅ Implementing features outside domain scope
- ✅ Using incompatible architectural patterns
- ✅ Ignoring mandatory hooks/services

## Example Instruction Improvements

**Before**: Generic guidance about React patterns
**After**: Explicit domain constraints like:

```markdown
## Domain Boundaries
This is specifically a **Chaos Game Theory** application focused on:
- Point-based iterative function systems (IFS)
- Sierpiński-type fractals generated through point plotting

**NOT for:**
- Line-drawing fractals (L-systems, binary trees, Koch curves)
- Pixel-based fractals (Mandelbrot/Julia sets)

## Required Architecture Patterns
ALL fractal scenes MUST use the existing `useCanvas` hook:
```tsx
// ✅ CORRECT
const { ref, drawPoint } = useCanvas({ onLoad: ... });

// ❌ WRONG 
const canvasRef = useRef<HTMLCanvasElement>(null);
```

## Anti-Patterns - DO NOT IMPLEMENT
- Custom canvas handling bypassing `useCanvas`
- Line drawing fractals that don't use chaos game methodology
```

## Benefits

1. **Prevents Architectural Violations**: Instructions explicitly reject inappropriate features
2. **Enforces Required Patterns**: Makes mandatory services/hooks impossible to miss
3. **Domain-Specific Guidance**: Tailored to the actual application purpose
4. **Validation Coverage**: Tests instructions against realistic scenarios
5. **Clear Boundaries**: Eliminates ambiguity about what belongs in the application

## Testing

The improved prompt chain includes validation steps that test whether the generated instructions would:
- ✅ Reject inappropriate feature requests
- ✅ Enforce required architectural patterns  
- ✅ Guide proper use of existing services
- ✅ Prevent common anti-patterns

This addresses the root cause of architectural mismatches and ensures future Copilot guidance stays within appropriate domain boundaries.
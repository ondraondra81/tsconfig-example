module.exports = {
    verbose: true,
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.ts(x)?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s(x)?$',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/public/',
        '/vendor/',
        '/patternlab/',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
        '^~utils/(.*)$': '<rootDir>/assets/src/utils/$1',
        '^~components/(.*)$': '<rootDir>/assets/src/components/$1',
        '^~enums/(.*)$': '<rootDir>/assets/src/enums/$1',
        '^~types/(.*)$': '<rootDir>/assets/src/types/$1',
        '^~store/(.*)$': '<rootDir>/assets/src/store/$1',
        '^~styles/(.*)$': '<rootDir>/assets/src/styles/$1',
    },
    collectCoverage: false,
};

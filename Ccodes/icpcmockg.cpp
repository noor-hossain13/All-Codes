

#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    if (!(cin >> N)) return 0;
    string line;
    getline(cin, line); // consume endline

    for (int i = 0; i < N; ++i) {
        if (!getline(cin, line)) break;

        // Interpret the input: replace each two-character sequence "\\0" with a single null-char
        vector<char> interp;
        size_t j = 0;
        while (j < line.size()) {
            if (line[j] == '\\' && j + 1 < line.size() && line[j+1] == '0') {
                interp.push_back('\0');
                j += 2;
            } else {
                interp.push_back(line[j]);
                j += 1;
            }
        }

        // sizeof(S) for a C string literal initialized like "..." is number of characters stored
        // (including any explicit '\0' inside) plus one implicit terminating null.
        int sizeof_s = static_cast<int>(interp.size() + 1);

        // strlen(S) is the count up to the first null char (excluding it).
        int strlen_s = 0;
        for (size_t k = 0; k < interp.size(); ++k) {
            if (interp[k] == '\0') break;
            ++strlen_s;
        }

        cout << sizeof_s << " " << strlen_s << '\n';
    }

    return 0;
}

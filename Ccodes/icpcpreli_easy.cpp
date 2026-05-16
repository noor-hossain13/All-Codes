#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    if (!(cin >> t)) return 0;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<long long> init(n);
        for (int i = 0; i < n; ++i) cin >> init[i];

        vector<array<long long,3>> rules(m);
        for (int i = 0; i < m; ++i) cin >> rules[i][0] >> rules[i][1] >> rules[i][2];

        unordered_set<long long> present(init.begin(), init.end());

        bool changed = true;
        while (changed) {
            changed = false;
            for (auto &r : rules) {
                if (present.count(r[2])) continue;
                if (present.count(r[0]) && present.count(r[1])) {
                    present.insert(r[2]);
                    changed = true;
                }
            }
        }

        cout << present.size() << '\n';
    }
    return 0;
}
